pipeline {
  agent any

  stages {

    stage('stop current processes') {
      steps {

        //If node and mongo are not already running this will throw an error
        sh "sudo kill \$(ps aux | grep '[n]ode' | awk '{print \$2}')"
        sh "sudo kill \$(ps aux | grep '[m]ongod' | awk '{print \$2}')"
      }
    }

    stage('checkout') {
      steps {
        checkout scm
      }
    }

    stage('build') {
      steps {
        sh 'mkdir -p logs'
        sh 'npm install'

        sh 'sudo npm install karma-cli -g'
        // If Environment does not have db, probably have to run repair operation after
        // sh 'scp -r -i ~/keys/aws.pem ubuntu@ec2-34-198-171-193.compute-1.amazonaws.com:~/data/db ~/workspace/data'

        sh 'scp -r -i ~/keys/aws.pem ubuntu@ec2-34-198-171-193.compute-1.amazonaws.com:/etc/letsencrypt/live/www.nickstaggs.com ./'

        configFileProvider([configFile(fileId: 'aa569752-3752-44e7-b5c5-0cc5fd3721db', variable: 'DOTENV')]) {
            sh 'cp $DOTENV ./.env'
        }
      }
    }

    stage('test') {
      steps {
        sh 'echo tests go here'
      }
    }

    stage('deploy') {
      steps {
        sh 'sudo npm start'
      }
    }
  }
}
