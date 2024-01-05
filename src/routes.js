const fs = require("fs");

const requestHandler = (req, res) => {
    if (req.url === "/") {
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write(
            "<body><form action='/message' method='POST'><input type='text' name='message' /><input type='text' name='second' /><button type='submit'>Send</button></form></body>"
        );
        res.write("</html>");

        return res.end();
    }

    if (req.url === "/message" && req.method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const paramString = parsedBody.split("&");
            let params = {};
            paramString.forEach((msg) => {
                [key, value] = msg.split("=");
                params[key] = value;
            });
            const message = params["message"];
            fs.writeFile("./message.txt", decodeURI(message), (err) => {
                res.writeHead(302, { Location: "/" });
                return res.end();
            });
        });
    }

    res.setHeader("Content-Type", "text/html");

    res.write("<html>"); // Append text to the body
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js server!</h1></body>");
    res.write("</html>");

    res.end();
};

module.exports = requestHandler;
