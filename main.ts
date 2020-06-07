namespace SpriteKind {
    export const turret = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    sprite.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    otherSprite.startEffect(effects.spray)
    sprite.destroy()
    info.changeScoreBy(100)
    music.baDing.playUntilDone()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() > next_fire) {
        fireturret(25)
        next_fire = game.runtime() + fire_rate
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.powerDown.playUntilDone()
})
function fireturret (multi: number) {
    bullet_vy = multi * turretpower * Math.sin(turretangle * Math.PI / 180)
    bullet_vx = multi * turretpower * Math.cos(turretangle * Math.PI / 180)
    bullet = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 4 4 . . . . . . . 
. . . . . . 5 5 5 5 . . . . . . 
. . . . . 4 5 5 5 5 4 . . . . . 
. . . . . . 5 5 5 5 . . . . . . 
. . . . . . . 4 4 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, turret, bullet_vx, bullet_vy)
    bullet.ay = 500
}
// use a 100px semi-circle centered on the base to
// determine where to draw the turret calculate x,y
// position based on turret-angle
function drawturret (base: Sprite, turret: Sprite, theta: number) {
    turret.setPosition(base.x + turretpower * Math.cos(theta * Math.PI / 180), base.y + turretpower * Math.sin(theta * Math.PI / 180))
}
let spaceship1: Sprite = null
let bullet: Sprite = null
let bullet_vx = 0
let bullet_vy = 0
let next_fire = 0
let fire_rate = 0
let turretpower = 0
let turretangle = 0
let turret: Sprite = null
let angle = 0
tiles.setTilemap(tiles.createTilemap(
            hex`0a0008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002040404040404040405`,
            img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 
`,
            [myTiles.tile0,sprites.builtin.brick,sprites.builtin.forestTiles1,sprites.builtin.forestTiles15,sprites.builtin.forestTiles2,sprites.builtin.forestTiles3,sprites.builtin.forestTiles5,sprites.builtin.forestTiles9,sprites.builtin.forestTiles13,sprites.builtin.forestTiles14,sprites.builtin.forestTiles6,sprites.builtin.forestTiles7,sprites.builtin.forestTiles11,sprites.builtin.forestTiles8,sprites.builtin.forestTiles10,sprites.builtin.forestTiles25,sprites.builtin.forestTiles24,sprites.builtin.forestTiles28,sprites.builtin.forestTiles29,sprites.builtin.forestTiles17,sprites.builtin.forestTiles18,sprites.builtin.forestTiles19,sprites.builtin.forestTiles0,sprites.builtin.forestTiles12],
            TileScale.Sixteen
        ))
turret = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.turret)
let base = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . 2 2 2 2 . . . . . . 
. . . . . . 2 2 2 2 . . . . . . 
. . . . . . 2 2 2 2 . . . . . . 
. . . . . a a a a a a . . . . . 
. . . . a a a a a a a a . . . . 
. . . a a a 4 4 4 4 a a a . . . 
. . . a a 4 4 4 4 4 4 a a . . . 
. . e e e e e e e e e e e e . . 
. 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
`, SpriteKind.Player)
tiles.placeOnTile(base, tiles.getTileLocation(5, 6))
turretangle = 90
turretpower = -10
drawturret(base, turret, turretangle)
let enemy_count = 3
let enemy_speed = 5
let enemy_spawn = 3000
fire_rate = 500
next_fire = game.runtime()
let next_spawn = game.runtime()
info.setScore(0)
info.setLife(3)
effects.starField.startScreenEffect()
game.onUpdateInterval(100, function () {
    if (game.runtime() > next_spawn && sprites.allOfKind(SpriteKind.Enemy).length < enemy_count) {
        spaceship1 = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . 2 . . . . . 2 . . . . . 
. . . . . 8 8 8 8 8 . . . . . . 
. . . . 8 8 8 8 8 8 8 . . . . . 
. . . 8 8 a a 8 a a 8 8 . . . . 
. . . . 8 8 8 8 8 8 8 . . . . . 
. . . . 8 8 5 5 5 8 8 . . . . . 
. . . 8 8 . . 2 . . 8 8 . . . . 
. . . 8 . . . . . . . 8 . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
        spaceship1.setPosition(Math.randomRange(0, 100), 0)
        spaceship1.follow(base, enemy_speed)
        next_spawn = game.runtime() + enemy_spawn
    }
})
game.onUpdate(function () {
    if (controller.dx() > 0) {
        turretangle += 1
        drawturret(base, turret, turretangle)
    } else if (controller.dx() < 0) {
        turretangle += -1
        drawturret(base, turret, turretangle)
    } else {
    	
    }
})
game.onUpdateInterval(10000, function () {
    enemy_speed += 10
    enemy_count += 2
    enemy_spawn += -100
})
