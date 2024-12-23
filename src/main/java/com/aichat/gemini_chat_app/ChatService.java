package com.aichat.gemini_chat_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ChatService {
    private final String geminiApiKey;
    private final String geminiApiUrl;
    private final WebClient webClient;

    @Autowired
    public ChatService(
            @Value("${gemini.api.key}") String geminiApiKey,
            @Value("${gemini.api.url}") String geminiApiUrl,
            WebClient webClient) {
        this.geminiApiKey = geminiApiKey;
        this.geminiApiUrl = geminiApiUrl;
        this.webClient = webClient;
    }

    public String getAnswer(String question) {
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", question)
                        })
                }
        );

        return webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
