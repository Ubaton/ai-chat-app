use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
use sqlx::postgres::PgPoolOptions;
use std::env;

#[derive(Deserialize)]
struct AskRequest {
    question: String,
}

#[post("/api/chat/ask")]
async fn ask_question(
    pool: web::Data<sqlx::PgPool>,
    payload: web::Json<AskRequest>,
) -> impl Responder {
    let question = payload.question.trim();

    // Validate that the question is not empty
    if question.is_empty() {
        return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Question cannot be empty."
        }));
    }

    // Insert the question into the database and retrieve its generated id.
    let result = sqlx::query!(
        r#"
        INSERT INTO questions (question)
        VALUES ($1)
        RETURNING id
        "#,
        question
    )
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(record) => {
            // Simulate obtaining an answer from a chat service.
            // Replace this with your actual logic.
            let answer = get_answer(question).await;
            HttpResponse::Ok().json(serde_json::json!({
                "id": record.id,
                "answer": answer
            }))
        }
        Err(e) => {
            eprintln!("Database insertion error: {:?}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to store the question."
            }))
        }
    }
}

/// Simulated chat service logic to generate an answer.
/// Replace this with your integration or business logic.
async fn get_answer(question: &str) -> String {
    format!("This is a dummy answer for: {}", question)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Optionally load environment variables from a .env file.
    dotenv::dotenv().ok();

    // Read the DATABASE_URL from the environment.
    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL environment variable must be set.");

    // Create a connection pool for PostgreSQL.
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create PostgreSQL connection pool.");

    // Start the HTTP server.
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(ask_question)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
