class ApiResponse {
  constructor(statusCode, message = "ha ha task done SUCCESS!", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}
