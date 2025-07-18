pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/yash-jawoor1/Autoscaling.git'
            }
        }

        stage('Verify Files') {
            steps {
                sh 'ls -la'
                sh 'cat index.php | head -n 10 || echo "index.php not found"'
            }
        }

        stage('PHP Syntax Check (Optional)') {
            steps {
                sh '''
                    if command -v php > /dev/null; then
                        find . -name "*.php" -print0 | xargs -0 -n1 php -l || true
                    else
                        echo "PHP not installed on Jenkins agent, skipping syntax check"
                    fi
                '''
            }
        }
    }
}

