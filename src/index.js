import P5 from 'p5/lib/p5';
import Sketch from './Sketch';

const p5 = new P5(init());


function init() {
    const sketch = new Sketch();
    return (sk) => {
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(sketch)).filter(method => method !== 'constructor');
        methods.forEach(method => sk[method] = () => sketch[method]());
        window.sk = sk;
    };
}