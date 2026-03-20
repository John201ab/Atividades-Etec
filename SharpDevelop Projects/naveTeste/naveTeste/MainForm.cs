using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace naveTeste
{

	public partial class MainForm : Form
	{
		//variaveis globais
		PictureBox fundo = new PictureBox();
		PictureBox nave = new PictureBox();
		PictureBox naveInimigo = new PictureBox();
		PictureBox tiro = new PictureBox();
		Label lbl_hpInimigo = new Label();
		
		int hpInimigo = 100;
		
		//timer
		Timer gameTimer = new Timer();
		
		//limites
		int sentido = 1;
		int velocidadeInimigo = 10;
		int sentidoTiro = 1;
		int velocidadeTiro = 30;
		bool tiroAtivo = false;
		Random rnd = new Random();
		
		
		public MainForm()
		{

			InitializeComponent();
			
			//configurações FORM
			Text = "Jogo";
			BackColor = Color.Black;
			FormBorderStyle = FormBorderStyle.None;
			Height = 1080;
			Width = 1920;
			KeyPreview = true;
			
			//hitpoint do inimigo
			lbl_hpInimigo.Parent = fundo;
			lbl_hpInimigo.Left = 1720;
			lbl_hpInimigo.Top = 990;
			lbl_hpInimigo.ForeColor = Color.Aqua;
			lbl_hpInimigo.Font = new Font("Arial", 14);
			lbl_hpInimigo.Text = "Hp Inimigo: 100";
			lbl_hpInimigo.AutoSize = true;
			
			
				
			
			//fundo
			fundo.Parent = this;
			fundo.BackColor = Color.Black;
			fundo.Height = 1080;
			fundo.Width = 1920;
			fundo.Load("fundo.jpg");
			fundo.SizeMode = PictureBoxSizeMode.StretchImage;
			
			//Nave
			nave.Parent = fundo;
			nave.Width = 150;
			nave.Height = 60;
			nave.Load("naveMeme.png");
			nave.SizeMode = PictureBoxSizeMode.StretchImage;
			nave.BackColor = Color.Transparent;
			nave.Left = 250;
			nave.Top = 510;
			
			//nave do inimigo
			
			naveInimigo.Parent = fundo;
			naveInimigo.Width = 150;
			naveInimigo.Height = 60;
			naveInimigo.Load("tiro.png");
			naveInimigo.SizeMode = PictureBoxSizeMode.StretchImage;
			naveInimigo.BackColor = Color.Transparent;
			naveInimigo.Left = 590;
			naveInimigo.Top = 510;
			
			//tiro
			naveInimigo.Parent = fundo;
			naveInimigo.Width = 50;
			naveInimigo.Height = 20;
			naveInimigo.Load("naveMeme1.png");
			naveInimigo.SizeMode = PictureBoxSizeMode.StretchImage;
			naveInimigo.BackColor = Color.Transparent;
			naveInimigo.Left = 590;
			naveInimigo.Top = 510;
								
			
			//configuração game timer
			
			gameTimer.Interval = 16;
			gameTimer.Enabled = true;
			gameTimer.Tick += gameTimerTick;

		}	
		void MainFormKeyDown(object sender, KeyEventArgs e)
		{
			//tecla ESC - Sair
			if (e.KeyCode == Keys.Escape) Application.Exit();
			
			//Teclas de Movimento
			if (e.KeyCode == Keys.Right) nave.Left += 15;
			if (e.KeyCode == Keys.Left) nave.Left -= 15;
			if (e.KeyCode == Keys.Down) nave.Top += 15;
			if (e.KeyCode == Keys.Up) nave.Top -= 15;
			if (e.KeyCode == Keys.Space && !tiroAtivo) {
				tiro.Left = nave.Left + nave.Width;
				tiro.Top = nave.Top + (int) nave.Height/2;
				
				tiroAtivo = true;}
			
			
		}
		
		void gameTimerTick(object sender, EventArgs e)
		{
			naveInimigo.Top += velocidadeInimigo * sentido;
			//clamp nave inimigo
			if(naveInimigo.Top >= Height - naveInimigo.Height || naveInimigo.Top <= 0)
				sentido =- sentido;
			
			//movimento tiro jogador
			tiro.Left += velocidadeTiro * sentidoTiro;
			
			//clamp tiro jogador
			if (tiro.Left > fundo.Width && tiroAtivo)
			{
				tiro.Left = 3000;
				tiroAtivo = false;
			}
			
			//teste colisão
			if (tiro.Bounds.IntersectsWith(naveInimigo.Bounds))
			{
				tiro.Left = 5000;
				tiroAtivo = false;
				
				hpInimigo -= rnd.Next(10,21);
				lbl_hpInimigo.Text = "HP Inimigo: " + hpInimigo;
				
				if (hpInimigo <= 0) naveInimigo.Left = 3000;
				
			}
				
		}
		
	}
}
