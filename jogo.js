		var canvas;
		var FPS = 30;
		var CANVAS_WIDTH = 500;
		var CANVAS_HEIGHT = 400;
		var height_barra = 0;
		var gravity = 2;
		var acelly = 0;
		var speed = 0;
		var barreira =[];
		var time_bar = 0;
		var speed_bar = 5;
		var time =0;
		var GameOver = false;
		var img = new Image();
		function inicializaJogo()
		{
			img.src = "images/background.png"
			canvas = document.getElementById("Tela").getContext("2d");
			window.addEventListener("mousedown", GanhaAltitude, false);
			criaObjetosJogo();	
			setInterval("loopJogo()",1000/FPS);
			setInterval("Time()", 1000);
			Sound.play("ambiente");
		}
		function Time()
		{
			if(!GameOver)
			{
				time_bar ++;
				time +=3;
			}
		}
		function loopJogo()
		{
			Update();
			Draw();
		}
		function Update()
		{
			if(!GameOver)
			{
				acelly += gravity;
				speed = acelly;
				player.y += speed;
				if(keydown.space && player.y > 0)
				{
					GanhaAltitude();
				}
				for(var i=0; i < 5; i ++)
					barreira[i].Update();
					if(time_bar >= 5)
					{
						speed_bar += 0.5;
						time_bar = 0;
					}
				if(player.y > CANVAS_HEIGHT + 50)
				{
					reset();
				}
				colision();
			}
			else
			{
				if(keydown.space)
				{
					invisivel();
				}
			}
		}
		function colision()
		{
			for(var i=0; i < 5; i++)
			{
				if(collides(player, barreira[i]))
				{
					Sound.play("Explosion with Metal Debris");
					reset();
				}
			}
		}
		function GanhaAltitude()
		{
			acelly = 0;
			player.y -= 8;
		}
		function reset()
		{
			player.y = CANVAS_HEIGHT /2;
			barreira_1.x = 200;
			barreira_2.x= 250;
			barreira_3.x = 400;
			barreira_4.x = 450;
			barreira_5.x = 600;
			speed_bar = 5;
			time_bar = 0;
			time =0;
			acelly = 0;
			document.getElementById("gameOver").style.display ="block";
			GameOver = true;
		}
		function collides(a, b)
		{
				return 	a.x < b.x + b.width && 
						a.x + a.width > b.x && 
						a.y < b.y + b.height &&
						a.y + a.height > b.y;
		}
		function Draw()
		{
			limpaTela();
			player.draw();
			for(var i=0; i < 5; i ++)
				barreira[i].draw();
		}
		function limpaTela()
		{
			canvas.drawImage(img,0,0);
		}
		function criaObjetosJogo()
		{
			player =
			{
				color: "#00A",
				x: 50,
				y: CANVAS_HEIGHT /2,
				width: 46,
				height: 28,
				sprite: Sprite("helicoptero"),
				draw: function()
				{
				   this.sprite.draw(canvas, this.x, this.y);
				}
		     }
			  barreira_1 =
			 {
				color: "red",
				x: 200,
				y: -200,
				width: 40,
				height: 400,
				sprite: Sprite("magic ass barrier"),
				draw: function()
				{
				   this.sprite.draw(canvas, this.x, this.y);
				},
				Update: function()
				{
					barreira_1.x -= speed_bar;
					if(barreira_1.x+ barreira_1.width < 0 )
					{
						barreira_1.x =  CANVAS_WIDTH;
						height_barra = Math.floor(Math.random() * (200 - 150))+ 150;
						barreira_1.y = -height_barra;
					}
				}
			 }
			barreira_2 =
			{
				color: "red",
				x: 250,
				y: 300,
				width: 40,
				height: 400,
				sprite: Sprite("predio"),
				draw: function()
				{
				   this.sprite.draw(canvas, this.x, this.y);
				},
				Update: function()
				{
					barreira_2.x -= speed_bar;
					if(barreira_2.x+ barreira_2.width < 0 )
					{
						barreira_2.x =  CANVAS_WIDTH;
						height_barra = (barreira_1.y + barreira_1.height) + 100;
						barreira_2.y = height_barra;
					}
				}
			 }
			  barreira_3 =
			 {
				color: "red",
				x: 400,
				y: -200,
				width: 40,
				height: 400,
				sprite: Sprite("magic ass barrier"),
				draw: function()
				{
				    this.sprite.draw(canvas, this.x, this.y);
				},
				Update: function()
				{
					barreira_3.x -= speed_bar;
					if(barreira_3.x+ barreira_3.width < 0 )
					{
						barreira_3.x =  CANVAS_WIDTH;
						height_barra = Math.floor(Math.random() * (200 - 150))+ 150;
						barreira_3.y = -height_barra;
					}
				}
			 }
			barreira_4 =
			{
				color: "red",
				x: 450,
				y: 300,
				width: 40,
				height: 100,
				sprite: Sprite("predio"),
				draw: function()
				{
				   this.sprite.draw(canvas, this.x, this.y);
				},
				Update: function()
				{
					barreira_4.x -= speed_bar;
					if(barreira_4.x+ barreira_4.width < 0 )
					{
						barreira_4.x =  CANVAS_WIDTH;
						height_barra = (barreira_3.y + barreira_3.height) + 100;
						barreira_4.y = height_barra;
						barreira_4.height = 300;
					}
				}
			 }
			barreira_5 =
			{
				color: "red",
				x: 600,
				y: -100,
				width: 40,
				height: 400,
				sprite: Sprite("magic ass barrier"),
				draw: function()
				{
				   this.sprite.draw(canvas, this.x, this.y);
				},
				Update: function()
				{
					barreira_5.x -= speed_bar;
					if(barreira_5.x+ barreira_5.width < 0 )
					{
						barreira_5.x =  CANVAS_WIDTH;
						height_barra = Math.floor(Math.random() * (200 - 50))+ 50; 
						barreira_5.y = -height_barra;
					}
				}
			 }
			barreira.push(barreira_1);
			barreira.push(barreira_2);
			barreira.push(barreira_3);
			barreira.push(barreira_4);
			barreira.push(barreira_5);
		}
		function invisivel()
		{
			GameOver = false;
			document.getElementById("gameOver").style.display ="none";
		}