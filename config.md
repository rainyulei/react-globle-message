使用的配置

closedable:true, 是否可以手动控制关闭
onClose:（）=>{} // 关闭时的回调函数
onStart:()=>{} // 打开时的回调函数
icon     图标图标显示
title    标题
message    内容
closeIcon 自定义关闭的按钮
loadingIcon 自定义加载时的按钮
position：  显示位置 left-top right-top left-middle middle-middle right-middle left-bottom middle-bottom right-bottom middle-top
delay       持续时间


store 配置

max  最多显示多少个
theme: dark light 
baseColor:   基准背景颜色
defaultStyle：
warningStyle：
errorStyle：
successStyle：
loadingStyle：

baseTemplate：component  接受 所有的使用配置 可以自定义所有的模式


其他的使用的配置 在 具体使用时会被具体配置覆盖
