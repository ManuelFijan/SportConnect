FROM maven:3.8.1-openjdk-17 AS build
WORKDIR /app
COPY . /app
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Set environment variables
ENV SPRING_DATASOURCE_PASSWORD="2sp_\$UU.T9Req5a"
ENV SPRING_DATASOURCE_URL="jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:5432/postgres?sslmode=require"
ENV SPRING_DATASOURCE_USERNAME="postgres.pccmxztqfmfucdbgcydr"
ENV SPRING_JWT_SECRET="9gAL6sHcleFIhLQYtvjs020yxMtdUlORqErFWXcx4s8="
ENV SPRING_OAUTH_GOOGLE_ID="1057622274801-g2dsst2pd1ikfu40uuarbn3jp6l55v8s.apps.googleusercontent.com"
ENV SPRING_OAUTH_GOOGLE_SECRET="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"
ENV SPRING_OAUTH_GITHUB_ID="Ov23lif4tEOJ5vrZ9rV4"
ENV SPRING_OAUTH_GITHUB_SECRET="ea302f82b01d1274f1ebca306cce214ab7b3d6ce"


EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]