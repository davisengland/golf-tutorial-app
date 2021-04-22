const Hello = (first_name, last_name) => {
    return `
        <!DOCTYPE html>
        <html style="margin: 0; padding: 0;">
            <head>
                <title>Hello ${first_name}</title>
            </head>
            <body style="margin: 0; padding: 0;">
                <br/>
                <br/>
                <div>Hello ${first_name} ${last_name}</div>
                <br/>
                <br/>
                <div>Thank you for signing up for My Golf! We appreciate your support!</div>
                <br/>
                <br/>
                <div>Best,</div>
                <br/>
                <div>The My Golf Team</div>
            </body>
        </html>`
}

module.exports = {Hello}