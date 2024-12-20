 package com.aichat.gemini_chat_app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ChatService {
// Access to APIKey and URL [Gemini]
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final WebClient webClient;

    public ChatService(WebClient webClient) {
        this.webClient = webClient;
    }


    public String getAnswer(String question) {
        // Construct the request payload
        Map<String, Object> requestBody = Map.of(
          "contents", new Object[] {
                  Map.of("parts", new Object[] {
                          Map.of("text", question)
        })
                }
        );
        
        //Make the API Call

        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Return response
        return response;
    }
}
