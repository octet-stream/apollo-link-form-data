const readStream = stream => new Promise((resolve, reject) => {
  const chunks = []

  const onEnd = () => resolve(Buffer.concat(chunks))

  const onReadable = () => {
    const chunk = stream.read()

    if (chunk != null) {
      chunks.push(chunk)
    }
  }

  stream
    .on("error", reject)
    .on("readable", onReadable)
    .on("end", onEnd)
})

module.exports = readStream
