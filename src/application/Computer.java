package application;

import util.Const;

public class Computer {
    private int level;
    private byte[] g = new byte[Const.CHROMO_NUM];
    
    public Computer(int n) {
        level = n;
        for(int i=0; i<g.length; i++) {
            g[i] = Const.GENE_ANS[n][i];
        }
    }
    
    public Computer(int n, byte[] chromosome) {
        level = n;
        for(int i=0; i<g.length; i++) {
            g[i] = chromosome[i];
        }
    }

    public String getNextAction(Othello game, int move) {
        Othello nextGame = search(game, move);

        int[][] b = game.getBoard();
        int[][] nb = nextGame.getBoard();
        
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                if(b[i][j] != Const.PUTABLE) continue;
                if(nb[i][j] == Const.BLACK || nb[i][j] == Const.WHITE) {
                    //System.out.println("("+i+","+j+")");
                    return Integer.toString(i * Const.BSIZE + j);
                }
            }
        }
        
        return Const.PASS_STR;
    }
    
    public Othello search(Othello game, int move) {
        int[][] board = game.getBoard();
        int val = Integer.MIN_VALUE;
        Othello nextGame = game.clone();

        // おける場所を探す
        int[] px = new int[Const.BSIZE * Const.BSIZE];
        int[] py = new int[Const.BSIZE * Const.BSIZE];
        int p = 0;
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                if(board[i][j] == Const.PUTABLE) {
                    px[p] = i;
                    py[p] = j;
                    p++;
                }
            }
        }
        if(p == 0) return game;
        for (int i = 0; i < p; i++) {
            Othello o = game.clone();
            o.applyAction(Integer.toString(px[i] * Const.BSIZE + py[i]));
            int v = minMax(o.clone(), move, Const.LEVEL_DEPTH[level]);
            
            if(v > val) {
                val = v;
                nextGame = o;
            }
        }
        
        return nextGame;
    }
    
    public int minMax(Othello game, int move, int depth) {
        if(depth == 0) return eval(game);
        
        boolean isMin = (move == game.getIntMove()) ? false : true;
        int[][] board = game.getBoard();
        int val = (isMin) ? Integer.MAX_VALUE : Integer.MIN_VALUE;

        // おける場所を探す
        int[] px = new int[Const.BSIZE * Const.BSIZE];
        int[] py = new int[Const.BSIZE * Const.BSIZE];
        int p = 0;
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                if(board[i][j] == Const.PUTABLE) {
                    px[p] = i;
                    py[p] = j;
                    p++;
                }
            }
        }
        
        if(p == 0) return eval(game);
        for (int i = 0; i < p; i++) {
            Othello o = game.clone();
            o.applyAction(Integer.toString(px[i] * Const.BSIZE + py[i]));
            int v = minMax(o.clone(), move, depth-1);
            
            if(isMin) {
                if(v < val) {
                    val = v;
                }
            } else {
                if(v > val) {
                    val = v;
                }
            }
        }
        return val;
    }
    
    public int eval(Othello game) {
        int move = game.getIntMove();
        int nmove = (move == Const.BLACK) ? Const.WHITE : Const.BLACK;
        int[][] board = game.getBoard();
        int value = 0;
        int turn = game.getTurn();
        int index;
        
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                switch (board[i][j]) {
                case Const.BLACK:
                case Const.PBLACK:
                    if(turn < 20) {
                        index = Const.WEIGHT[i][j];
                    } else if(turn < 40) {
                        index = Const.WEIGHT[i][j] + 12;
                    } else {
                        index = Const.WEIGHT[i][j] + 24;
                    }
                    
                    if (move == Const.BLACK) {
                        value += g[index];
                    } else {
                        value -= g[index];
                    }
                    break;
                    
                case Const.WHITE:
                case Const.PWHITE:
                    if(turn < 20) {
                        index = Const.WEIGHT[i][j];
                    } else if(turn < 40) {
                        index = Const.WEIGHT[i][j] + 12;
                    } else {
                        index = Const.WEIGHT[i][j] + 24;
                    }
                    
                    if (move == Const.BLACK) {
                        value -= g[Const.WEIGHT[i][j]];
                    } else {
                        value += g[Const.WEIGHT[i][j]];
                    }
                    break;
                    
                case Const.SPACE:
                case Const.PUTABLE:
                default:
                    break;
                }
            }
        }
        

        if(turn < 20) {
            index = 10;
        } else if(turn < 40) {
            index = 10 + 12;
        } else {
            index = 10 + 24;
        }
        
        value += (game.getScore(move) - game.getScore(nmove)) * g[index];
        value += game.checkPutable(move) * g[index];
        return value;
    }
}