async function fetchAndRecognizeCaptcha() {
    try {
      // 发送 HTTP 请求获取验证码
      const response = await fetch('http://localhost:8088/api/auth/code?ts=1699797542206&fontSize=34');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // 获取 SVG 字符串
      const svgString = await response.text();
  
      // 提取 SVG 中的文本
      const textValues = extractTextFromSVG(svgString);
  
      // 输出提取的文本值
      console.log('提取的文本值:', textValues);
    } catch (error) {
      console.error('获取验证码失败:', error);
    }
  }
  
  function extractTextFromSVG(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
  
    // 提取所有文本节点的内容
    const textNodes = doc.querySelectorAll('text');
    const textValues = Array.from(textNodes).map(node => node.textContent.trim());
  
    return textValues;
  }
  
  // 执行函数
  fetchAndRecognizeCaptcha();
  