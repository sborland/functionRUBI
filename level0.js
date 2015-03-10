var functionRUBI = functionRUBI || {};


functionRUBI.level0 = function(){};

functionRUBI.level0.prototype = {
	
	//load this level's specific map
 preload: function(){
 	this.load.tilemap('level0', 'assets/world/level0/tutlevel.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Wall', 'assets/world/level0/walledges.png'); 	
	//this.load.image('bg', 'assets/world/level0/bg.png'); 
 	
 },
	
	
  create: function() {
  	
 //local variables for enemies
 this.enemies = [];
 this.enemiesAlive;
 this.enemiesTotal;
 

 
 ///////////// Implementing map stuff///////////// 
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  menuFilter();
  	 //  this.bg = this.game.add.sprite(0,0,'bg');
  	 //  this.bg.width = this.game.world.width;
  	 //  this.bg.height = this.game.world.height;
  	
  	  
 /////////////////////////////////////////////////////////////////////////////////////////////////////CHANGE 	  
	this.map = this.game.add.tilemap('level0'); 
	this.map.addTilesetImage('Wall','Wall');
    this.map.setCollisionBetween(1,9);
     
        this.wall = this.map.createLayer('Tile Layer 1');
        this.wall.resizeWorld(); 



 //Endgame goal
 this.goal = this.game.add.sprite(1504,224,'goal'); 
 this.goal.animations.add('squiggly');
  this.game.physics.enable(this.goal, Phaser.Physics.ARCADE);
  this.goal.body.setSize(64, 64, 0, 0);
  this.goal.anchor.setTo(.5,.5);
  this.goal.body.immovable = true;
 //////////
 
 
 //tutorial stuff///
 this.tutMove = this.game.add.sprite(274,935,'tutMovement'); 
 this.tutIntro = this.game.add.sprite(274,1135,'tutIntro'); 
 this.tutShoot = this.game.add.sprite(274,755,'tutShoot');
 this.tutShoot1 = this.game.add.sprite(204,545,'tutShoot1');
  this.tutShoot2 = this.game.add.sprite(204,385,'tutShoot2');
  
  this.tutHealth1 = this.game.add.sprite(1040,485,'tutHealth1');
  this.tutHealth = this.game.add.sprite(590,485,'tutHealth');
  
  this.tutUpgrade = this.game.add.sprite(1040,785,'tutUpgrade');
  this.tutUpgrade1 = this.game.add.sprite(1040,985,'tutUpgrade1');
  
    this.tutGoal = this.game.add.sprite(1540,485,'tutGoal');
 
 
 //////sss
 
 
 //adding player to map
 createBullets();
  	 this.player = this.game.add.sprite(96,1216,'player'); 
  	 this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  	 this.player.anchor.setTo(.5,.5);
  	 this.player.body.setSize(45, 50, 0, 0);
  	 this.player.collideWorldBounds = true;
  	 this.player.animations.add('walk');	    
 	 this.game.camera.follow(this.player);
 	 
 	 

  	  
 //implementing GUI////
 this.gui = this.game.add.sprite(0,0,'GUI'); 
 this.gui.anchor.setTo(.5,.5);
 this.player.addChild(this.gui);
 
 this.healthText = this.game.add.text(-34, 34, 'rubucks:'+rubiHealth.rubucks, { font: " 14px Courier", fill: "#2EFE2E" });
this.player.addChild(this.healthText);

this.textArray1 = [];
	this.textArray1[0] = 'int'; 
	this.textArray1[1] = 'string'; 
	this.textArray1[2] = 'double'; 
	this.textArray1[3] = 'float'; 
	this.textArray1[4] = 'boolean';

this.dataTypeText = this.game.add.text(-34, 44, 'dataType: '+this.textArray1[ globalVar.gunVar], { font: " 14px Courier", fill: "#2EFE2E" });
this.player.addChild(this.dataTypeText);
 
 /////////////////////////////
 
 

  
  //keyboard and mouse control
 	cursors = {
                up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down:this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
 	this.QKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
this.EKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
 	
    


///adding enemies to map

this.enemies.push(new Enemy(0, functionRUBI, functionRUBI.enemyBullets, "follower", 736, 1056));
this.enemies.push(new Enemy(1, functionRUBI, functionRUBI.enemyBullets, "mildew", 448, 320));
this.enemies.push(new Enemy(2, functionRUBI, functionRUBI.enemyBullets, "mildew", 1600, 960));



this.enemyGroup = this.game.add.group();

	for (var i = 0; i < this.enemies.length; i++) {
	var addenemy = this.enemies[i].sprite;
	this.enemyGroup.add(addenemy);
  	}  
  	
  	 //particle collision with wall
 this.emitHitWall = functionRUBI.game.add.emitter(0,0,500);
this.emitHitWall.makeParticles('spark');
  	
this.background = this.game.add.sprite(0,0,'mainMenuUI');
	this.background.width =800;
	this.background.height =600;
	this.background.fixedToCamera = true;
   this.background.cameraOffset.setTo(0, 0);
  },
  update: function() {

  	 
  	 
  	//////////////////// //COLLISION//////////////////////////////////////////
  	//player/enemy collsion with wall
    this.game.physics.arcade.collide(this.player, this.wall);
     this.game.physics.arcade.collide(this.enemyGroup, this.wall);
     this.game.physics.arcade.collide(this.enemyGroup, this.goal);
     
     //player collsion with goal
     this.game.physics.arcade.overlap(this.player,this.goal, this.endGame, null, this);
     
    //enemy collision with rubi bullet
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.intBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.doubleBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.floatBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.stringBullets, this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.emitSBullets,  this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.booleanBullets, this.hitEnemy, null, this);
     
     //bullet collsion with wall
    this.game.physics.arcade.overlap(functionRUBI.intBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.doubleBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.floatBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.stringBullets, this.wall, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.emitSBullets, this.wall, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.wall, this.killBullet, null, this);


	// enemy bullet collision with player
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.player, this.hitRUBI, null, this);

	//enemy collsion with enemy
	this.game.physics.arcade.collide(this.enemyGroup, this.enemyGroup);


	filterUpdate();
  
  //////////Enemy update function////////////	
  	this.enemiesAlive = 0;

    for (var i = 0; i < this.enemies.length; i++)
    {
        if (this.enemies[i].alive)
        {
            this.enemiesAlive++;
            this.enemies[i].update(this.player);
        }
    }
    /////////////////
  	
  	
  	this.player.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));
	functionRUBI.floatBullets.forEachAlive(floatMove,this);  
    functionRUBI.floatBullets.forEachAlive(floatRotate,this);
	

//Player movement code///////////    
    this.player.body.velocity.x = 0;
 	this.player.body.velocity.y = 0;
 	

    if (cursors.up.isDown){
    	 this.player.animations.play('walk', 8);
          this.player.body.velocity.y = -(300+rubiUpgrade.speed);
    } else if (cursors.down.isDown){
    	this.player.animations.play('walk', 8);
         this.player.body.velocity.y = (300+rubiUpgrade.speed);
    }

    if (cursors.left.isDown){
    	this.player.animations.play('walk', 8);
              this.player.body.velocity.x = -(300+rubiUpgrade.speed);
    }else if (cursors.right.isDown){
    	this.player.animations.play('walk', 8);
              this.player.body.velocity.x = (300+rubiUpgrade.speed);
    }

     
    
    //switches between bullet. bulletSwitch found in Bullet.js
    this.QKey.onDown.add(bulletSwitch,this);
     globalVar.swap = 0;
    this.EKey.onDown.add(bulletSwitch,this);
     globalVar.swap = 0;
    
    
    //shoots each type of bullet
     if (this.game.input.activePointer.isDown) {
     	adjustRate( globalVar.gunVar);
     	if ( globalVar.gunVar==0){
    		intFire(this.player);
    	}else if( globalVar.gunVar==1){
    		stringFire(this.player);
    	} else if ( globalVar.gunVar ==2){
    		doubleFire(this.player);
    	}else if ( globalVar.gunVar ==3){
    		floatFire(this.player);
    	}
    	else if( globalVar.gunVar ==4){
    		booleanFire(this.player);
    	}
        
    }
    
    
    ///Switching of frames of the glowing thing around RUBI & the text
    this.healthText.text = 'rubucks:'+rubiHealth.rubucks;
     this.dataTypeText.text= 'dataType: '+this.textArray1[ globalVar.gunVar];
     this.gui.frame=  globalVar.gunVar;
    
    //fades away bullet explosions & other animation details
     this.emitHitWall.forEachAlive(function(p){
		p.alpha= p.lifespan / 500;
	});
	 functionRUBI.emitSBullets.forEachAlive(function(p){
		p.alpha= p.lifespan / 1000;
	});
	functionRUBI.emitBoolean.forEachAlive(function(p){
		p.alpha= p.lifespan / 500;
	});
	this.goal.animations.play('squiggly',6);
	
	
	 	if (rubiHealth.rubucks <= 0) {
  		rubiHealth.dead = true;
  		this.endGame();
  	}
	
  },
  

  ///////kills bullets if it touches a wall//////
  killBullet: function(bullet,wall){
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
 	 bullet.kill();  	
  },
  
  /////decrements RUBI's health when enemy bullet hits her///////
  hitRUBI: function(wall,bullet){
  	if(functionRUBI.floatBullets.countLiving()>0){
  		var floatBullet = functionRUBI.floatBullets.getFirstAlive();
  		floatBullet.kill();
  	} else{
  	rubiHealth.rubucks -=40;
  	}
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
  	bullet.kill();  	
  	if (rubiHealth.rubucks <= 0) {
  		rubiHealth.dead = true;
  		this.endGame();
  	}
  },
  
   ///////kills enemy if bullet hit enemy//////
  hitEnemy: function(enemy,bullet){
		
	bulletDamage = getBulletDamage(bullet);	
	
	enemy.health -= bulletDamage+rubiUpgrade.damage;
	
	console.log(enemy.health);
	 if(enemy.type =="slime"){
    		enemy.sprite.animations.play('hurt', 6);
    }
	
	if (enemy.health <= 0)
    {
    	endLevel.enemyBucks += getEnemyValue(enemy);
   
        enemy.alive = false;
        enemy.kill();
        
    }
		this.emitHitWall.x = enemy.x;
		this.emitHitWall.y = enemy.y;
		this.emitHitWall.start(true,500,null,10);
  	bullet.kill();		
  },
  
  
  /////////endgame/////////////////
  endGame: function(){
  	checkLevel.level0 = true;
  	endLevel.levelFin = 0;
  	functionRUBI.RUBIBullets.destroy(true);
  	this.enemyGroup.destroy(true);
  	this.game.state.start('EndGame');
  },
  
  
  
  //debug functions
render: function(){
	this.game.debug.text('',100,100);
//	 this.game.debug.text("DEBUGTEXT",100,100);
	// this.game.debug.text(" globalVar.gunVar "+ globalVar.gunVar,100,120);
	 //this.game.debug.text("gunrate "+fireRate,100,140 );
	  //this.game.debug.text("Px "+this.player.x,100,160);
	 //  this.game.debug.text("Py "+this.player.y,100,180);
	 //  this.game.debug.body(this.player);
	// this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,200);
	
	},

};
