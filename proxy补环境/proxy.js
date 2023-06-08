let _window = {

};
let _navigator = {

};
let _screen = {

};
let _stringify = JSON.stringify;
JSON.stringify = function (Object) {
    // ?? 的意思是，如果 ?? 左边的值是 null 或者 undefined，那么就返回右边的值。
    if ((Object?.value ?? Object) === global) {
        return "global";
    }
    return _stringify(Object);
};

function getMethodHandler(WatchName) {
    let methodhandler = {
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray);
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${result}].`);
            return result;
        },
        construct(target, argArray, newTarget) {
            let result = Reflect.construct(target, argArray, newTarget);
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${JSON.stringify(result)}].`);
            return result;
        }
    };
    return methodhandler;
}

function getObjHandler(WatchName) {
    let handler = {
        get(target, propKey, receiver) {
            let result = Reflect.get(target, propKey, receiver);
            if (result instanceof Object) {
                if (typeof result === "function") {
                    console.log(`[${WatchName}] getting propKey is [${propKey}] , it is function`);
                    //return new Proxy(result,getMethodHandler(WatchName))
                } else {
                    console.log(`[${WatchName}] getting propKey is [${propKey}], result is [${JSON.stringify(result)}]`);
                }
                return new Proxy(result, getObjHandler(`${WatchName}.${propKey}`));
            }
            console.log(`[${WatchName}] getting propKey is [${propKey}], result is [${result}]`);
            return result;
        },
        set(target, propKey, value, receiver) {
            if (value instanceof Object) {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${JSON.stringify(value)}]`);
            } else {
                console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
            }
            return Reflect.set(target, propKey, value, receiver);
        },
        has(target, propKey) {
            let result = Reflect.has(target, propKey);
            console.log(`[${WatchName}] has propKey [${propKey}], result is [${result}]`);
            return result;
        },
        deleteProperty(target, propKey) {
            let result = Reflect.deleteProperty(target, propKey);
            console.log(`[${WatchName}] delete propKey [${propKey}], result is [${result}]`);
            return result;
        },
        getOwnPropertyDescriptor(target, propKey) {
            let result = Reflect.getOwnPropertyDescriptor(target, propKey);
            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey}] result is [${JSON.stringify(result)}]`);
            return result;
        },
        defineProperty(target, propKey, attributes) {
            let result = Reflect.defineProperty(target, propKey, attributes);
            console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${JSON.stringify(attributes)}], result is [${result}]`);
            return result;
        },
        getPrototypeOf(target) {
            let result = Reflect.getPrototypeOf(target);
            console.log(`[${WatchName}] getPrototypeOf result is [${JSON.stringify(result)}]`);
            return result;
        },
        setPrototypeOf(target, proto) {
            console.log(`[${WatchName}] setPrototypeOf proto is [${JSON.stringify(proto)}]`);
            return Reflect.setPrototypeOf(target, proto);
        },
        preventExtensions(target) {
            console.log(`[${WatchName}] preventExtensions`);
            return Reflect.preventExtensions(target);
        },
        isExtensible(target) {
            let result = Reflect.isExtensible(target);
            console.log(`[${WatchName}] isExtensible, result is [${result}]`);
            return result;
        },
        ownKeys(target) {
            let result = Reflect.ownKeys(target);
            console.log(`[${WatchName}] invoke ownKeys, result is [${JSON.stringify(result)}]`);
            return result;
        },
        apply(target, thisArg, argArray) {
            let result = Reflect.apply(target, thisArg, argArray);
            console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${result}].`);
            return result;
        },
        construct(target, argArray, newTarget) {
            let result = Reflect.construct(target, argArray, newTarget);
            console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray}], result is [${JSON.stringify(result)}].`);
            return result;
        }
    };
    return handler;
}

const window = new Proxy(Object.create(_window), getObjHandler("window"));
const navigator = new Proxy(Object.create(_navigator), getObjHandler("navigator"));
const screen = new Proxy(Object.create(_screen), getObjHandler("screen"));
module.exports = {
    window,
    navigator,
    screen,
};