pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yash3020/demo'                      // Your Docker Hub image
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'     // Jenkins credentials for DockerHub
        KUBECONFIG_CREDENTIALS_ID = 'eks-kubeconfig'        // Jenkins credentials for kubeconfig
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/yash-jawoor1/Autoscaling.git'
            }
        }

        stage('Install Dependencies') {
            when {
                expression { fileExists('package.json') } // Only run if Node.js project
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            when {
                expression { fileExists('package.json') }
            }
            steps {
                sh 'npm test || echo "No tests defined, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBECONFIG')]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG
                        kubectl apply -f k8s/deployment.yaml
                        kubectl apply -f k8s/service.yaml
                    '''
                }
            }
        }
    }
}

