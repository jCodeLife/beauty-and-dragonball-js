const { Editor, Model, Skybox, ThirdPersonCamera, loop, World, Find, Reticle, Keyboard, Joystick, Point3d } = Lingo;

const model = new Model();
model.src = "girl.fbx"
model.animations = {
    idle: "idle.fbx",
    walking: "walking.fbx",
    walkingBackwards: "walking-backwards.fbx",
    running: "running.fbx",
    jumping: "jumping.fbx",
    dancing: "dancing.fbx"
}
model.animation = "idle"
model.physics = "character"

const map = new Model()
map.src = "map/scene.gltf"
map.scale = 40
map.physics = "map"

const camera = new ThirdPersonCamera()
camera.append(model)
camera.active = true
camera.mouseControl = true

const skybox = new Skybox()
skybox.texture = "skybox.jpeg"

const keyboard = new Keyboard()
keyboard.onKeyPress = (key) => {
    console.log(key)
    if (key === 'w'|| key === "ArrowUp") {
        model.animation = "running"
        model.moveForward(-10)
        found()
    }
    // 后
    if (key === "s"|| key === "ArrowDown") {
        model.animation = "walkingBackwards"
        model.moveForward(6)
        found()
    }
    // 按下w和e时，开始跑
    if (key === "w e") {
        model.animation = "running"
        model.moveForward(-15)
        found()
    }
    // 或者只按e时，开始跑
    if (key === "e") {
        model.animation = "running"
        model.moveForward(-15)
        found()
    }

    if (key === "Space") {
        model.animation = "jumping"
        model.moveForward(-3)
        model.y += 6
        found()
    }

    if (key === "d") {
        model.animation = "dancing"
        found()
    }
}
keyboard.onKeyUp = (k) => {
    model.animation = "idle"
}


//用于标记找到的数量
let findCount = new Set()

// 龙珠
let dragonBalls = [
    { id: "db1", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: 516.29, y: -1198.63, z: 173.60 },
    { id: "db2", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: -980.8, y: -801.4, z: 2693.9 },
    { id: "db3", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: -420.9, y: -1289.5, z: -3538.2 },
    { id: "db4", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: -676.3, y: -1900.2, z: 6343.7 },
    { id: "db5", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: -898.7, y: -1231.8, z: 3563.8 },
    { id: "db6", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: 395.9, y: -1308.6, z: 5900.3 },
    { id: "db7", src: "dragon_ball.fbx", physics: "map", scale: 0.8, x: 455.8, y: -1267.0, z: 3867.4 }
]
// 龙珠模型
let dbs = []


for (let i = 0; i < dragonBalls.length; i++) {
    dbs[i] = new Model()
    dbs[i].src = dragonBalls[i].src;
    dbs[i].physics = "map";
    dbs[i].scale = dragonBalls[i].scale;
    dbs[i].x = dragonBalls[i].x
    dbs[i].y = dragonBalls[i].y
    dbs[i].z = dragonBalls[i].z
}
// 神龙的小弟，sl2号
let sl2 = new Model()
sl2.src = "sl2.fbx"
sl2.scale = 0
sl2.x = -221.30
sl2.y = -1300.07
sl2.z = -3900
// findCount.add(7)
// 真神龙
let sl0 = new Model()
sl0.src = "sl0.fbx"
sl0.scale = 0
sl0.x = -214.9
sl0.y = -804.91
sl0.z = -8364


function found() {
    for (let i = 0; i < dbs.length; i++) {
        if (Math.abs(model.x - dbs[i].x) < 80 && Math.abs(model.y - dbs[i].y) < 80 && Math.abs(model.z - dbs[i].z) < 80) {
            findCount.add(i)
            dbs[i].scale = 1.5
           
        }

        if (findCount.size === 7) {
            alert("龙珠收集成功，龙已经出现在某个地方")
            sl2.scale = 1
            findCount.add(7)
        }
        if (findCount.size === 8 && Math.abs(model.x - sl2.x) < 50 && Math.abs(model.y - sl2.y) < 50 && Math.abs(model.z - sl2.z) < 50) {
            sl0.scale = 37
            findCount.add(8)
            alert("神龙出现！靠近神龙，它会带你回家")
        }

        if (findCount.size === 9 && model.z - sl0.z < 2000) {
            // if(findCount.size === 0){
            sl2.scale = 0
            sl0.scale = 0
            map.src = "myhome.fbx"
            model.x = 209.39
            model.y = -317.7
            model.z = 603.66
            model.physics = 'map'
            setTimeout(()=>{alert("恭喜！成功回家！!")},6000)

        }
    }
}  

