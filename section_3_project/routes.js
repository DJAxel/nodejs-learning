const requestHandler = (req, res) => {
    if (req.url == "/") {
        res.write("<html><body>");
        res.write("<p>Greetings from Node.js!</p>");

        res.write("<form action='/create-user' method='post'>");
        res.write("<input type='text' name='username' />");
        res.write("<input type='submit' value='Toevoegen' />");
        res.write("</form>");

        res.write("</body></html>");
        return res.end();
    }
    if (req.url == "/create-user" && req.method == "POST") {
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
            console.log(params["username"]);

            res.write("<html><body>");
            res.write(`<p>New user called ${params["username"]}</p>`);
            res.write("</body></html>");
            return res.end();
        });
    }
    if (req.url == "/users") {
        res.write("<html><body><ul>");
        res.write("<li>Michelle</li>");
        res.write("<li>David</li>");
        res.write("<li>Lisa</li>");
        res.write("</ul></body></html>");
        return res.end();
    }
};

module.exports = requestHandler;
