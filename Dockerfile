# Use OpenJDK 17 with Alpine Linux as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Expose port 8080 for the Spring Boot app
EXPOSE 8080

# Create a volume at /tmp for Spring Boot's internal use
VOLUME /tmp

# Copy the JAR file from the target directory to the container
COPY target/*.jar /app/app.jar

# Set environment variables if needed
ENV JAVA_OPTS=""

# Define the entry point to run the Spring Boot application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
