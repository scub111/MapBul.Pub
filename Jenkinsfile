pipeline {
  agent any
  environment {
    HOME = '.'
  }
  stages {
    stage('Docker prune'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'docker system prune -a -f'
        }
      }
    }

    stage('Copy .env'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'cp ../_Persist/mapbul-pub/admin/.env.prod packages/admin/.env.prod'
          sh 'cp ../_Persist/mapbul-pub/ssr/.env.prod packages/ssr/.env.prod'
          sh 'cp ../_Persist/mapbul-pub/server/.env packages/server/src/.env'
        }
      }
    }

    stage('Bootstrap'){
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          sh 'npm -v'
          sh 'lerna -v'
          sh 'npm run bootstrap'
        }
      }
    }

    stage('Build'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'npm run build'
        }
      }
    }

    stage('Server image'){
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          sh 'docker build -t mapbul-pub-server -f Dockerfile.server .'
        }
      }
    }

    stage('Server container'){
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          sh 'docker stop mapbul-pub-server'
          sh 'docker rm mapbul-pub-server'
          sh 'docker run -d --name mapbul-pub-server --restart always -p 3100:3100 mapbul-pub-server'
        }
      }
    }

    stage('SSR image'){
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          sh 'docker build -t mapbul-pub-ssr -f Dockerfile.ssr .'
        }
      }
    }

    stage('SSR container'){
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          sh 'docker stop mapbul-pub-ssr'
          sh 'docker rm mapbul-pub-ssr'
          sh 'docker run -d --name mapbul-pub-ssr --restart always -p 3300:3300 mapbul-pub-ssr'
        }
      }
    }

    stage('Admin image'){
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          sh 'docker build -t mapbul-pub-admin -f Dockerfile.admin .'
        }
      }
    }

    stage('Admin container'){
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          sh 'docker stop mapbul-pub-admin'
          sh 'docker rm mapbul-pub-admin'
          sh 'docker run -d --name mapbul-pub-admin --restart always -p 3500:8888 mapbul-pub-admin'
        }
      }
    }
  }
}