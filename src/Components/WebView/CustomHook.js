import {useEffect} from 'react';

const CustomHook = data => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;

    script.innerHTML = `(function (w,d,s,o,f,js,fjs) {
      w['JS-Widget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
      js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
      js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', 'mw', 'https://cxpdev.merilent.com/static/js/app/widget.js'));
    mw('init', { someConfiguration: 42 });
    mw('data', '${data}' )
    mw('accessToken', '3f47cf35-f19c-de80-ef3e-2a469b614546');`;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default CustomHook;
