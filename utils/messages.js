function formatMessage(username, text) {
  return {
    username,
    text,
    time: Date.now().toLocaleString(),
  }
}

module.exports = formatMessage
