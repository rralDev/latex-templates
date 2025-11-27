const vscode = require("vscode");

function createDocument(template) {
    const docPromise = vscode.workspace.openTextDocument({
        content: template,
        language: "latex"
    });

    docPromise.then(doc => {
        vscode.window.showTextDocument(doc);
    });
}

function activate(context) {

    const articleTemplate = `
\\documentclass{article}

\\title{Título del Artículo}
\\author{Autor}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introducción}

Escribe aquí...

\\end{document}
    `;

    const bookTemplate = `
\\documentclass{book}

\\title{Título del Libro}
\\author{Autor}
\\date{\\today}

\\begin{document}

\\maketitle

\\chapter{Capítulo 1}

Contenido aquí...

\\end{document}
    `;

    const letterTemplate = `
\\documentclass{letter}

\\signature{Tu Nombre}
\\address{Tu Dirección}

\\begin{document}

\\begin{letter}{Destinatario}
\\opening{Estimado,}

Aquí tu carta...

\\closing{Saludos,}

\\end{letter}
\\end{document}
    `;

    context.subscriptions.push(
        vscode.commands.registerCommand("latex.createArticle", () => {
            createDocument(articleTemplate);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("latex.createBook", () => {
            createDocument(bookTemplate);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("latex.createLetter", () => {
            createDocument(letterTemplate);
        })
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};