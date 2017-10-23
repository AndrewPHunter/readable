/*
This isn't ideal as it duplicates the config of the api-server
create-react-app doesn't allow imports outside of src/ directory without ejection
Going through this process is outside the scope of the nano-degree assignment
 */

exports.port = process.env.PORT || 3001;
exports.baseUrl = process.env.ORIGIN || `http://localhost:${exports.port}`;
