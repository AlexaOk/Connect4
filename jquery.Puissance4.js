(function($)
{
	$.fn.puissance4=function(options)
	{

		var defauts=
		{
			'numberOfLines': 6,
			'numberOfColumns': 7,
			'player1': "Player 1",
			'player2': "Player 2",
			'colorP1': 'purple',
			'colorP2': 'yellow'
		};

		var parameters=$.extend(defauts, options);

		var nbGame = 0;

		$("#options").html("<h1>Connect 4</h1>");
		$("<input id='player1' type='text' maxlength='9' placeholder='Player 1' />").insertAfter("h1");
		$("<br><select id='colorPlayer1'><option value='blue'>Blue</option><option value='purple'>Purple</option><option value='pink'>Pink</option></select><br>").insertAfter("#player1");
		$("<br><input id='player2' type='text' maxlength='9' placeholder='Player 2'/>").insertAfter("#colorPlayer1");
		$("<br><select id='colorPlayer2'><option value='yellow'>Yellow</option><option value='green'>Green</option><option value='red'>Red</option></select><br>").insertAfter("#player2");
		$("<br><input id='columns' type='text' maxlength='2' placeholder='9 columns max' />").insertAfter("#colorPlayer2");
		$("<br><input id='lines' type='text' maxlength='2' placeholder='9 lines max' />").insertAfter("#columns");
		$("<br><input id='play' type='submit' value='Play' />").insertAfter("#lines");
		$("<br><input id='replay' type='submit' value='New Partie' />").insertAfter("#play");
		$("<br><input id='undo' type='submit' value='Undo' />").insertAfter("#replay");

		function check()
		{
			numberOfLines = $("#lines").val();
			numberOfLines = parseInt(numberOfLines);
			nbLines = parameters.numberOfLines;

			numberOfColumns = $("#columns").val();
			numberOfColumns = parseInt(numberOfColumns);

			widthGame = (numberOfLines * 90) + "px";
			heightGame = (numberOfColumns * 90) + "px";

			colorP1=$('#colorPlayer1').val();
			colorP2=$('#colorPlayer2').val();
			firstLetter1 = parameters.player1[7];
			firstLetter2 = parameters.player2[7];

			if ($("#player1").val().length > 0 && $("#player2").val().length > 0)
			{
				if ($("#player1").val() == $("#player2").val())
				{
					alert("Please enter two different names");
					$("#player1").val("");
					$("#player2").val("");
					nbGame = 0;
					return false;
				}
			}

 			if ($("#player1").val().length > 0)
	  		{
				firstLetter1 = $("#player1").val()[0]+$("#player1").val()[1];
				parameters.player1 = $("#player1").val();
			}

			if ($("#player2").val().length > 0)
			{
				firstLetter2 = $("#player2").val()[0]+$("#player2").val()[1];
				parameters.player2 = $("#player2").val();
			}


			if (numberOfLines > 9 || parameters.numberOfLines > 9)
			{
				alert("9 lines maximum !");
				$("#lines").val("");
				nbGame = 0;
				return false;
			}
			else if (numberOfColumns > 9 || parameters.numberOfColumns > 9)
			{
				alert("9 columns maximum !");
				$("#columns").val("");
				nbGame = 0;
				return false;
			}
			else
			{
				return true;
			}
				}

		function Grid()
		{

			if (numberOfLines >=6 && typeof(numberOfLines) === "number" && numberOfColumns >= 6 && typeof(numberOfColumns) === "number")
			{
					parameters.numberOfLines = numberOfLines;
					parameters.numberOfColumns = numberOfColumns;
			}

			$("<table id='game' cellspacing='7'>").insertAfter("#options");

			for (var i = 1; i <= parameters.numberOfLines; parameters.numberOfLines--)
			{
				var tr = $("<tr data-lines=" + parameters.numberOfLines + " class=lines-" + parameters.numberOfLines +">").css("background", "#62bfc4");
				var tab = $("#game").append(tr).css("background", "#62bfc4");

				for (var j = 1; j <= parameters.numberOfColumns; j++)
				{
					$(".lines-" + parameters.numberOfLines).append("<td class=columns-" + parameters.numberOfLines + "-" + j + " data-etat=false data-player=>");
				};
			};

			$("<p id=turn>").insertAfter("#undo");
		}

		function getInfo()
		{
			myCol = $(td).attr("class");

			numCol = myCol.split("-");

			numCol = numCol[1] + "-" + numCol[2];

			numCol1 = numCol[1];
			numCol2 = numCol[2];
		}

		function putToken()
		{
			for (numeroLigne = 1; numeroLigne <= nbLines; numeroLigne++)
			{
				tdPlayer = $("." + "columns-" + numeroLigne + "-" + numCol2);
				etatPlayer = $("." + "columns-" + numeroLigne + "-" + numCol2).data("etat");

 				if (etatPlayer == false)
				{
					if (idPlayer == 1)
					{
						$(tdPlayer).data({"etat": "true", "player": idPlayer}).html(firstLetter1).css({"background" : colorP1}).css({"position" : "relative"}).css({"animation-name": "fall"}).css({"animation-duration": "0.2s"});
						if (horizontal(idPlayer) || vertical(idPlayer) || diagonal(idPlayer))
						{
							$("#turn").html(parameters.player1 + " winner of this game").css({"color": colorP1, "font-weight": "bold"});
							idPlayer = 0;
							break;
						}
						else
						{
							idPlayer = 2;
							$("#turn").html(parameters.player2 + "\'s turn").css({"color": colorP2, "font-weight": "bold"});
							break;
						}
					}
					else if (idPlayer == 2)
					{
						$(tdPlayer).data({"etat": "true", "player": idPlayer}).html(firstLetter2).animate({marginTop: 0},"slow").css({"background" : colorP2}).css({"position" : "relative"}).css({"animation-name": "fall2"}).css({"animation-duration": "0.2s"})

						if (horizontal(idPlayer) || vertical(idPlayer) || diagonal(idPlayer))
						{
							$("#turn").html(parameters.player2 + " winner of this game").css({"color": colorP2, "font-weight": "bold"});
							idPlayer = 0;
							break;
						}
						else
						{
							idPlayer = 1;
							$("#turn").html(parameters.player1 + "\'s turn").css({"color": colorP1, "font-weight": "bold"});
							break;
						}
					}
				}
			};
		}

		function horizontal(idPlayer)
		{
			if (idPlayer == 1)
			{
				parameters.player = parameters.player1;
			}
			else if (idPlayer == 2)
			{
				parameters.player = parameters.player2;
			}

			var win = 0;

			for(var z = 1; z <= parameters.numberOfColumns; z++)
			{
				if ($(".columns-" + numeroLigne + "-" + z).data("player") === idPlayer)
				{
					win++;
					if (win == 4)
					{
						alert(parameters.player +" won");
						return true;
					}
				}
				else
				{
					win = 0;
				}
			}
		}

		function diagonal(idPlayer)
		{
			if(idPlayer == 1)
			{
				parameters.player = parameters.player1;
			}
			else if(idPlayer == 2)
			{
				parameters.player=parameters.player2;
			}

			var win = 0;
			for (var x = 1; x <= parameters.numberOfColumns;x++)
			{
				if ($(".columns-" + x + "-" + x).data("player") === idPlayer)
				{
					win++;
					if (win == 4)
					{
						alert(parameters.player + " won");
						return true;
					}
				}
				else
				{
					win = 0;
				}
			}
		}

		function vertical(idPlayer)
		{
			if (idPlayer == 1)
			{
				parameters.player = parameters.player1;
			}
			else if (idPlayer == 2)
			{
				parameters.player = parameters.player2;
			}

			var win = 0;

			for(var z = 1; z <= nbLines; z++)
			{
				if ($(".columns-" + z + "-" + numCol2).data("player") === idPlayer)
				{
					win++;
					if (win == 4)
					{
						alert(parameters.player +" won");
						return true;
					}
				}
				else
				{
					win = 0;
				}
			}
		}
    //
		// $("#undo").click(function()
		// {
		// 	location.reload();
		// });

		$("#play").click(function()
		{
			if (nbGame == 0)
			{
				nbGame = 1;
				idPlayer = 1;

				if (check() )
				{
					Grid();
				};


				$("td").click(function()
				{
					td = this;
					getInfo();

					putToken();
				});
			};
		});

		$("#replay").click(function()
		{
			location.reload();
		});
	};
})(jQuery);

$("#options").puissance4();
