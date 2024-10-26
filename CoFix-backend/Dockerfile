# Use a compatible base image
FROM openjdk:17-jdk

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar app.jar

# Expose the application's port (modify if necessary)
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
