function ShowErrorMessage(message) {
    let html = document.createElement('div');
    html.className = 'alert alert-danger';
    html.textContent = message;
    return html;
};

function ShowSuccessMessage(message) {
    let html = document.createElement('div');
    html.className = 'alert alert-success';
    html.textContent = message;
    return html;
};

export default { ShowErrorMessage, ShowSuccessMessage }