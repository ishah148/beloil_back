function shouldGenerateDatabaseValues(): boolean {
    const flag = '--generate'
    const flagIndex = process.argv.indexOf(flag);
    return flagIndex !== -1
}

export default shouldGenerateDatabaseValues();