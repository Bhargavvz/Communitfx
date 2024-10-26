# # Use a base image with Java
# FROM openjdk:17-jdk-alpine
#
# # Set the working directory
# WORKDIR /app
#
# # Copy the Spring Boot JAR file from the target directory
# COPY target/app.jar /app/app.jar
#
# # Expose the port on which the Spring Boot application will run
# EXPOSE 8080
#
# # Set environment variables
# ENV JAVA_OPTS=""
#
# # Define the entry point for the container
# ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

#FROM eclipse-temurin:17-jdk-alpine
FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
