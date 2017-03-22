if(process.argv.length<3) {
    console.error("Usage: node index.js telegram_token");
    process.exit(1);
}
console.log(process.argv[2])
