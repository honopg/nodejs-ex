module.exports = {
	port: process.env.OPENSHIFT_NODEJS_PORT || 3001,
	ip: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	db: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/app-db',
	SECRET_TOKEN: 'miclavedetokenparamiaplicacion'
}