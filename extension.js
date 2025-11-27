const vscode = require("vscode");

function activate(context) {
    console.log("LaTeX Templates extension is active!");

    // Create Article Template
    let createArticle = vscode.commands.registerCommand(
        "latexTemplates.createArticle",
        function () {
            createFile("article.tex", getArticleTemplate());
        }
    );

    // Create Book Template
    let createBook = vscode.commands.registerCommand(
        "latexTemplates.createBook",
        function () {
            createFile("book.tex", getBookTemplate());
        }
    );

    // Create Letter Template
    let createLetter = vscode.commands.registerCommand(
        "latexTemplates.createLetter",
        function () {
            createFile("letter.tex", getLetterTemplate());
        }
    );

    context.subscriptions.push(createArticle, createBook, createLetter);
}

// Helper: creates a new file with content
function createFile(filename, content) {
    const workspace = vscode.workspace.workspaceFolders;

    if (!workspace) {
        vscode.window.showErrorMessage("You must open a folder before creating a LaTeX template.");
        return;
    }

    const folder = workspace[0].uri;
    const fileUri = folder.with({ path: folder.path + "/" + filename });

    vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, "utf8"))
        .then(() => vscode.window.showInformationMessage(`Created ${filename}`));
}

// Templates
function getArticleTemplate() {
    return `
\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{Article Template}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}

Your content here.

\\end{document}
`;
}

function getBookTemplate() {
    return `
\\documentclass{book}
\\usepackage[utf8]{inputenc}

\\title{Book Template}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\chapter{Introduction}

Your content here.

\\end{document}
`;
}

function getLetterTemplate() {
    return `
\\documentclass{letter}
\\usepackage[utf8]{inputenc}

\\signature{Your Name}

\\begin{document}

\\begin{letter}{Recipient Name \\\\ Address}

\\opening{Dear Name,}

Your content here.

\\closing{Sincerely,}

\\end{letter}

\\end{document}
`;
}

function deactivate() {}

module.exports = { activate, deactivate };