#!/usr/bin/env groovy
node {
  def BuildContainerJob = 'BuildContainer'
  def DeployServiceJob = 'DeployService'
  def GitOrganization = "systeam-org"
  def ServiceGitRepo = "seller-service-ui"
  def DockerHubOrganization = "systeamorg"
  def ServiceDockerHubRepo = "seller-service-ui"
  def ServiceBuildNumber = "${env.BUILD_NUMBER}"


  stage('Checkout from Git') {
  		checkout ([
  		$class: 'GitSCM',
  		branches: [[name: '*/master']],
  		extensions: [
  				[$class: 'CleanCheckout']
  		],
  		userRemoteConfigs: [[credentialsId: 'admin', url: "https://github.com/${GitOrganization}/${ServiceGitRepo}"]]
  		])
  }

  stage('Build Docker Image') {
    build_ddr = build job: "${BuildContainerJob}",
    parameters: [
        string(name: 'GitOrganization', value: "${GitOrganization}"),
        string(name: 'ServiceGitRepo', value: "${ServiceGitRepo}"),
        string(name: 'DockerHubOrganization', value: "${DockerHubOrganization}"),
        string(name: 'ServiceDockerHubRepo', value: "${ServiceDockerHubRepo}"),
        string(name: 'ServiceBuildNumber', value: "${ServiceBuildNumber}")
      ]
   }

   stage('Deploy Service') {
    build_ddr = build job: "${DeployServiceJob}",
    parameters: [
        string(name: 'GitOrganization', value: "${GitOrganization}"),
        string(name: 'ServiceGitRepo', value: "${ServiceGitRepo}")
      ]
  }

}