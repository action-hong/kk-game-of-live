- [x] 以直观形式在网页输出生命游戏二维数组的格子；当时有几种选择，比如在table、div中填色，使用canvas直接操作ImageData像素，使用canvas逐个fillRect绘制矩形等方法。这些我都逐一测试过了，测试的结果是fillRect绘制矩形的性能胜出，并且考虑到将来像素尺寸的扩展性，就选择了它。一开始设定的细胞尺寸都是固定的。首先绘制白底，如果无生命就画灰方块，有生命就画红方块，方块边缘留一个像素。这样就有了标题图中的效果。
- [x] 运行、单步、停止操作按钮；这个很好理解，为了便于检查运行效果。单步也可以用于精确控制和查看细胞形状的进化。
- [x] 生成随机密度细胞的初始化模版；分为少量随机、中等随机和密集随机，其实就是给三个数字阈值，随机大于此值则有生命，点击初始化后绘制。
- [x] 调节运行速度；原理就是修改每一帧绘制完成后到下一回合计算前的setTimout等待时间。
- [x] 状态展示栏；一共三项，分别是S当前回合数，C本回合计算时间，D本回合绘制时间。为了实现时间统计，将计算部分和绘制部分独立分拆成两个函数，也是为将来的优化打下基础。
- [x] 优化绘制过程；发现计算时间基本稳定，但增大画布尺寸和细胞数量的话，绘制时间会变得很长。单独优化绘制过程不太可能，需要在计算时统计所有变动的格子，绘制时只绘制这些格子而不是全部重绘，时间大大缩短。
- [ ] 调节细胞显示尺寸；有了上一步的优化，在画面上流畅绘制更多格子成为可能。这样就可以减小尺寸，显示更复杂更大的图形了。但在调节尺寸时如果直接清空画布就不合适了，加了两种处理方式：如果是由大变小，旧图出现在新图中间，周围填满空白；如果是由小变大，就裁切旧图中间的一块。
- [ ] 增加预设模版；这里要插句题外话，生命游戏远不止是一群随机图形自行演化。研究者们早就发现了里面有许多有规律的图形：比如静止型的，就是每个活细胞周围恰好都有2~3个，死细胞周围都不是3个，所以图形在没有外来细胞入侵时会一直稳定下去：除此之外还有枪（能够连续发射飞船）、长者（几个细胞就能延续几千数万代，构成极大一片混沌）、吞食者（平时静止，但能吸收特定形状的飞船并保持原状）等等等。这些都是生命游戏爱好者和研究者们几十年来的结果，有的形状多达数万甚至数十万个细胞，构成庞大的自动机器。想了解更多的话不妨去专门的Wiki看看：LifeWiki扯远了，那我们如何定义并导入模版呢？有3~4种较为通用的代码来定义，我们选用了Wiki里常见的RLE格式，编写了一个解析器。并在初始化选项中追加了一批比较有意思的模板，大家都可以在我的演示页面里看到（仅限桌面端，手机版由于画面太小显示不全，只保留了随机生成部分）

- [ ] 将当前全图导出为RLE代码；
- [ ] 使用鼠标左键和右键在图上绘制及擦除细胞；
- [ ] 允许在运行过程中也能用鼠标绘制及擦除；
- [ ] 预置一批可插入的形状集合，并通过两层下拉框进行分类；
- [ ] 在一个小型预览框中预览要插入的形状；
- [ ] 使用旋转及翻转按钮改变可插入形状的造型，并实时生成RLE代码；
- [ ] 插入前鼠标在画面上移动显示半透明预览；
- [ ] 按下Ctrl键时允许拖拽画面；
- [ ] 增加一个改变细胞颜色的按钮；
- [ ] 适配移动端，将原先显示在画面右方的工具栏一部分移到上方，一部分放到弹出窗口中。
