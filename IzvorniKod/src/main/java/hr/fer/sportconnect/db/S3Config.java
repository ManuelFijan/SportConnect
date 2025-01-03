package hr.fer.sportconnect.db;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Bean
    public S3Client s3Client() {
        String endpointUrl = "https://pccmxztqfmfucdbgcydr.supabase.co/storage/v1/s3";
        String accessKey = "d21ce52c3b4ad040b38423ecc905b02d";
        String secretKey = "2957a2cf5df47874c4e103949159ad21c05a9d032f3af2a57640b90f623667a7";

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);

        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .endpointOverride(java.net.URI.create(endpointUrl))
                .region(Region.EU_CENTRAL_1)
                .serviceConfiguration(
                        software.amazon.awssdk.services.s3.S3Configuration.builder()
                                .pathStyleAccessEnabled(true)
                                .build()
                )
                .httpClient(UrlConnectionHttpClient.create())
                .build();
    }
}