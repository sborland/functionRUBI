functionRUBI.MainMenu = function(){};

functionRUBI.MainMenu.prototype = {
  create: function() {
    
     // filter from http://glslsandbox.com/e#18578.0
    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
        "}",

        "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
            "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.1;",

            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
            "c = pow(c, 0.2);",
            "c *= 0.2;",

            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.08;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


            "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
        "}"
    ];

    this.filter = new Phaser.Filter(this.game, null, fragmentSrc);
    this.filter.setResolution(800, 600);

    this.sprite = this.game.add.sprite();
   this.sprite.width = 800;
    this.sprite.height = 600;
    
    this.sprite.filters = [ this.filter ];
    
    
     // this.background = this.game.add.tileSprite(50, 200, 700,124, 'title');
      this.title = this.game.add.sprite(50,200,'title'); 
       this.title.animations.add('title');	

    
    startButton = this.game.add.button(300,400, 'start',this.startClick,this,1,0,1);
    
   
   
  },
  update: function() {
   this.filter.update(functionRUBI.game.input.mousePointer);
   	this.title.animations.play('title', 2);
   
  },
  
  startClick: function(){
  	this.game.state.start('LevelMenu');
  }
};