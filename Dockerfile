FROM openjdk:17-jdk-alpine
#VOLUME /tmp
WORKDIR /app
COPY CoFix-backend/target/*.jar /app/app.jar
COPY CoFix-frontend /app/frontend
EXPOSE 8000
ENTRYPOINT ["java","-jar","/app.jar"]