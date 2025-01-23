package hr.fer.sportconnect.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.nio.file.Paths;

@Service
public class SupabaseS3Service {

    private final S3Client s3Client;

    @Autowired
    public SupabaseS3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Uploads a file to the specified bucket in supabase storage.
     *
     * @param bucketName  The name of the bucket - "slike"
     * @param objectKey   The object key (filename) within the bucket
     * @param filePath    The local path to the file to be uploaded
     */
    public void uploadFile(String bucketName, String objectKey, String filePath) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .contentType("image/jpeg") // Adjust based on file type
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromFile(Paths.get(filePath)));
    }

    public void deleteFile(String bucketName, String objectKey) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);

            System.out.println("File deleted successfully: " + objectKey);
        } catch (NoSuchKeyException e) {
            System.err.println("The specified key does not exist: " + objectKey);
        } catch (S3Exception e) {
            System.err.println("Failed to delete file: " + e.awsErrorDetails().errorMessage());
            throw e;
        }
    }
}