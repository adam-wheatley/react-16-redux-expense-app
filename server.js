const path = require('path');
const express = require('express');
const app = express();
const pathPublic = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

app.use(express.static(pathPublic));

app.get('*', (req, res) => {
    res.sendFile(path.join(pathPublic, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});