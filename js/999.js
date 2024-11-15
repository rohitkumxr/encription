// Vigenère Cipher Encrypt
function encrypt(plaintext, k) {
    if (k.length <= 1) {
        alert("Keyword should be at least 2 characters long");
        return;
    }
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
        ciphertext += String.fromCharCode((((plaintext.charCodeAt(i) - 97) + (k.charCodeAt(i % k.length) - 97) + 26) % 26) + 97);
    }
    return ciphertext;
}

// Vigenère Cipher Decrypt
function decrypt(ciphertext, k) {
    if (k.length <= 1) {
        alert("Keyword should be at least 2 characters long");
        return;
    }
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i++) {
        plaintext += String.fromCharCode((((ciphertext.charCodeAt(i) - 97) - (k.charCodeAt(i % k.length) - 97) + 26) % 26) + 97);
    }
    return plaintext;
}

// Rail Fence Cipher Encode
function encodeMessage(message, rows) {
    message = message.split(" ").join("");
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([]);
    let rail = 0;
    let change = 1;

    for (let char of message.split("")) {
        fence[rail].push(char);
        rail += change;
        if (rail === rows - 1 || rail === 0) change = -change;
    }

    let r = '';
    for (let rail of fence) r += rail.join("");
    return r;
}

// Rail Fence Cipher Decode
function decodeMessage(message, rows) {
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([]);
    let rail = 0;
    let change = 1;

    message.split("").forEach(char => {
        fence[rail].push(char);
        rail += change;
        if (rail === rows - 1 || rail === 0) change = -change;
    });

    const rFence = [];
    for (let i = 0; i < rows; i++) rFence.push([]);

    let i = 0;
    let s = message.split("");
    for (let r of fence) {
        for (let j = 0; j < r.length; j++) rFence[i].push(s.shift());
        i++;
    }

    rail = 0;
    change = 1;
    let r = "";
    for (let i = 0; i < message.length; i++) {
        r += rFence[rail].shift();
        rail += change;
        if (rail === rows - 1 || rail === 0) change = -change;
    }

    return r;
}

// Double Encryption: Vigenère Cipher first, then Rail Fence Cipher
function doubleEncrypt(message, keyword, rows) {
    let vigenereEncrypted = encrypt(message.toLowerCase(), keyword.toLowerCase());
    return encodeMessage(vigenereEncrypted, rows);
}

// Double Decryption: Rail Fence Cipher first, then Vigenère Cipher
function doubleDecrypt(message, keyword, rows) {
    let railFenceDecrypted = decodeMessage(message, rows);
    return decrypt(railFenceDecrypted.toLowerCase(), keyword.toLowerCase());
}

// Cipher Button Function: Encrypt using double encryption
function cipherButtonFunction() {
    var enteredKey = document.getElementById('enteredKey').value;
    var message = document.getElementById("inputMessage").value;
    var rows = parseInt(document.getElementById("rows").value);

    if (enteredKey == "" || message == "") {
        alert("Please enter key and message to be ciphered!");
        return;
    }
    var result = doubleEncrypt(message, enteredKey, rows);
    document.getElementById("result").value = result;
}

// Decipher Button Function: Decrypt using double decryption
function decipherButtonFunction() {
    var enteredKey = document.getElementById('enteredKey').value;
    var message = document.getElementById("inputMessage").value;
    var rows = parseInt(document.getElementById("rows").value);

    if (enteredKey == "" || message == "") {
        alert("Please enter key and message to be deciphered!");
        return;
    }
    var result = doubleDecrypt(message, enteredKey, rows);
    document.getElementById("result").value = result;
}
