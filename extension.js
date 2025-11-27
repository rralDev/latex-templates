const vscode = require("vscode");

function activate(context) {
    console.log("LaTeX Templates extension is active!");

    // Create Article Template
    let createArticle = vscode.commands.registerCommand(
        "latexTemplates.createArticle",
        function () {
            vscode.window.showInputBox({ prompt: "Enter file name", value: "article.tex" }).then(name => {
                if (!name) return;
                createFile(name, getArticleTemplate());
            });
        }
    );

    // Create Book Template
    let createBook = vscode.commands.registerCommand(
        "latexTemplates.createBook",
        function () {
            vscode.window.showInputBox({ prompt: "Enter file name", value: "book.tex" }).then(name => {
                if (!name) return;
                createFile(name, getBookTemplate());
            });
        }
    );

    // Create Letter Template
    let createLetter = vscode.commands.registerCommand(
        "latexTemplates.createLetter",
        function () {
            vscode.window.showInputBox({ prompt: "Enter file name", value: "letter.tex" }).then(name => {
                if (!name) return;
                createFile(name, getLetterTemplate());
            });
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
    return `\documentclass{article}
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
    return `\documentclass{book}
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
    return `\documentclass{letter}
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