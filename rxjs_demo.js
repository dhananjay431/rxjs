///////////////////////////////////////////////////////////
//pipe resolve observable using switchMap 
import {
    of ,
    fromEvent,
    interval,
    from,
    bindCallback
} from 'rxjs';
import {
    map,
    debounce,
    switchMap
} from 'rxjs/operators';
import {
    ajax
} from 'rxjs/ajax';


let b = document.getElementById("t1")

let d = data => ajax(`https://jsonresp.herokuapp.com/datatable/` + data).pipe(
    map(x => x.response.data),
);

let b$ = fromEvent(b, 'keyup').pipe(
    debounce(() => interval(300)),
    switchMap(x => d(x.target.value.length))
);
b$.subscribe(x => console.log(x))
///////////////////////////////////////////////////////////
//callback function to observable

import {
    bindCallback
} from 'rxjs';
const someFunction = (cb) => {
    fetch('https://jsonresp.herokuapp.com/datatable')
        .then(response => response.json())
        .then(json => {
            cb(json)
        })
}

const boundSomeFunction = bindCallback(someFunction);
boundSomeFunction().subscribe(values => {
    console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
});
///////////////////////////////////////////////////////////
//inside pipe observable with callback function 
import {
    of ,
    fromEvent,
    interval,
    from,
    bindCallback
} from 'rxjs';
import {
    map,
    debounce,
    switchMap
} from 'rxjs/operators';
import {
    ajax
} from 'rxjs/ajax';



const someFunction = (cb) => {
    fetch('https://jsonresp.herokuapp.com/datatable')
        .then(response => response.json())
        .then(json => {
            cb(json)
        })
}
let b = document.getElementById("t1")
let b$ = fromEvent(b, 'keyup').pipe(
    debounce(() => interval(300)),
    switchMap(x => bindCallback(someFunction)())
);
b$.subscribe(x => console.log(x))
//////////////////////////////////////////////////////////////
//inside pipe observable with callback function pass value
import {
    of ,
    fromEvent,
    interval,
    from,
    bindCallback
} from 'rxjs';
import {
    map,
    debounce,
    switchMap
} from 'rxjs/operators';
import {
    ajax
} from 'rxjs/ajax';


let b = document.getElementById("t1")
const someFunction = (d, cb) => {
    fetch('https://jsonresp.herokuapp.com/datatable/' + d.length)
        .then(response => response.json())
        .then(json => {
            cb(json)
        })
}

let b$ = fromEvent(b, 'keyup').pipe(
    debounce(() => interval(300)),
    switchMap(x => bindCallback(someFunction)(x.target.value))
);
b$.subscribe(x => console.log(x))
///////////////////////////////////////////////////
//working on demo 

/////////////////////////////////////////////////////////

import {
    of ,
    fromEvent,
    from,
    interval
} from 'rxjs';
import {
    map,
    pluck,
    filter,
    tap,
    concatMap,
    take,
    switchMap
} from 'rxjs/operators';

let d$ = fromEvent(document.getElementById("email"), "keyup").pipe(
    pluck('target', 'value'),
    map(x => x.split(";"))
).pipe(
    tap(x => console.log("t3=>", x)),
    switchMap(x => from(x).pipe(
        map(x => x + "_")
    )),
    tap(x => console.log("t4=>", x)),
)


d$.subscribe(x => console.log("resp=>", x));


from([123, 1234, 123, 213, 456456]).pipe(
    map(x => x + "_")
).subscribe(x => console.log(x));
/////////////////////////////////////////////////////
//multiple email check validation 
import {
    of ,
    fromEvent,
    from,
    interval,
    concat
} from 'rxjs';
import {
    map,
    pluck,
    filter,
    tap,
    concatMap,
    take,
    switchMap,
    reduce
} from 'rxjs/operators';

function show(data) {
    return data.split(";");
}

function email(data) {
    let e = RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i);
    return data.match(e) != null;
}
let d$ = fromEvent(document.getElementById("email"), "keyup").pipe(
    pluck('target', 'value'),
    map(x => show(x)),
    switchMap(x => from(x).pipe(
        map(x => x),
    )),
    filter(x => email(x))
)
d$.subscribe(x => console.log("resp=>", x));

/////////////////////////////////
import {
    from,
    of ,
    fromEvent,
    bindCallback
} from 'rxjs';
import {
    map,
    pluck,
    switchMap,
    tap
} from 'rxjs/operators';

function getP(cb) {
    return new Promise(cb);
}

function ajax(data, result, cb) {
    debugger;
    if (data.length < 1) {
        cb(result);
    } else {
        let pop = data.shift();
        fetch('https://jsonresp.herokuapp.com/datatable/' + pop)
            .then(response => response.json())
            .then(json => {
                let t = {};
                t[pop] = json
                result.push(t);
                ajax(data, result, cb);
            })
    }

}

function show(d) {
    return d.split(";");

}

let d$ = fromEvent(document.getElementById("test"), 'keyup').pipe(
    pluck('target', 'value'),
    map(x => show(x)),
    switchMap(x => bindCallback(ajax)(x, []))
)
d$.subscribe(x => console.log("final=>", x));