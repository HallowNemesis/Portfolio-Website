class Enemy extends Sprite {
    constructor({
        position,
        collisionBlocks,
        platformCollisionBlocks,
        imageSrc,
        frameRate,
        scale = 0.5,
        animations,
    }) {
        super({ imageSrc, frameRate, scale });
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.life = 10;
        this.currentlife = 10;

        this.collisionBlocks = collisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }

        this.animations = animations;
        this.lastDirection = 'right';

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;

            this.animations[key].image = image;
        }

        this.markedForDeletion = false;
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return;

        // this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;

    }

    update() {
        this.updateFrames();
        this.updateHitbox();


        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollisions();
    }

    checkForHorizontalCanvasCollision() {
        if (
            this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
            this.hitbox.position.x + this.velocity.x <= 0
        ) {
            this.velocity.x = 0;
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;

                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y;

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }

        //Platform Collision Blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];

            if (
                platformCollision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

}

class Worm extends Enemy{
    constructor({
        position,
        collisionBlocks,
        platformCollisionBlocks,
        imageSrc,
        frameRate,
        scale = 0.5,
        animations,
    }) {
        super({collisionBlocks, platformCollisionBlocks, imageSrc, frameRate, scale, animations});

        this.spriteWidth = 80;
        this.spriteHeight = 60;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        this.velocity.x = Math.random() * 0.1 + 0.1;

        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.life = 10;
        this.currentlife = 10;

        this.collisionBlocks = collisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }

        this.animations = animations;
        this.lastDirection = 'right';

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;

            this.animations[key].image = image;
        }
    }
}
