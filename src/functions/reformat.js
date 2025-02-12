const reformat = (input) => {
  const lines = input.split(/\r?\n/)
  let result = ''

  lines.forEach((line) => {
    if (line !== '' && line !== '// COMMANDER') {
      if (result !== '') {
        // Only add newline if result is not empty and
        //  one doesn't exist yet.
        result += '\r\n'
      }

      let treatment = ''

      if (line.endsWith('F')) {
        treatment = 'F'
      } else if (line.endsWith('E')) {
        treatment = 'E'
      } else {
        // Just add line to result unedited.
        result += line
      }

      if (treatment !== '') {
        // Find treatment symbol and wrap it in
        // asterisks.
        const lastIndexOfTreatment = line.lastIndexOf(treatment)
        const reformattedLine = line
          .substring(0, lastIndexOfTreatment)
          .concat(`*${treatment}*`)
        result += `${reformattedLine}`
      }
    }
  })

  return result
}

export default reformat
