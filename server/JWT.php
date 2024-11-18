<?php

$secret = 'MySecretKey';
$header = ['alg' => 'HS256', 'typ' => 'JWT'];


function base64urlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64urlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function createJWT($header, $payload, $secret) {
    $encodedHeader = base64urlEncode(json_encode($header));
    $encodedPayload = base64urlEncode(json_encode($payload));
    
    $signature = hash_hmac('sha256', "$encodedHeader.$encodedPayload", $secret, true);
    $encodedSignature = base64urlEncode($signature);
    
    return "$encodedHeader.$encodedPayload.$encodedSignature";
}

function verifyJWT($jwt, $secret) {
    list($encodedHeader, $encodedPayload, $encodedSignature) = explode('.', $jwt);
    
    $signature = base64urlEncode(hash_hmac('sha256', "$encodedHeader.$encodedPayload", $secret, true));
    
    return hash_equals($encodedSignature, $signature);
}
function getJWTValue($jwt, $key) {
    $encodedPayload = explode('.', $jwt)[1];
    $decodedPayload = json_decode(base64urlDecode($encodedPayload), true);

    return isset($decodedPayload[$key]) ? $decodedPayload[$key] : null;
}


