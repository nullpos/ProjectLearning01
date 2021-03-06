package application;

import util.Const;

public class Othello {
    private String move = null;
    private int[][] board = new int[Const.BSIZE][Const.BSIZE];
    private int[] px = new int[Const.BSIZE * Const.BSIZE];
    private int[] py = new int[Const.BSIZE * Const.BSIZE];
    private int pnum = 0;
    
    public Othello() {
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                board[i][j] = Const.INIT_BOARD[i][j];
            }
        }
        this.setMove(Const.BLACK_STR);
        this.checkPutable(Const.BLACK);
    }
    
    public String whichIsWinner() {
        int n=0;
        int tmp;
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                tmp = board[i][j];
                if(tmp == Const.BLACK || tmp == Const.PBLACK) {
                    n++;
                } else if(tmp == Const.WHITE || tmp == Const.PWHITE) {
                    n--;
                }
            }
        }
        
        if(n == 0) {
            return Const.DRAW_STR;
        } else if(n > 0) {
            return Const.BLACK_STR;
        } else if(n < 0) {
            return Const.WHITE_STR;
        } else {
            return "ERROR";
        }
    }
    
    public boolean isGameFinished() {
        Othello tmp = this.clone();
        int nmove = (this.getIntMove() == Const.BLACK) ? Const.WHITE : Const.BLACK;
        // 両者ともに置く場所がない
        if(pnum == 0 &&
                tmp.checkPutable(nmove) == 0) {
            return true;
        } else {
            return false;
        }
    }
    
    public int[] getPx() {
        return px;
    }

    public int[] getPy() {
        return py;
    }

    public int getPnum() {
        return pnum;
    }

    public String getMove() {
        return this.move;
    }
    
    public int[][] getBoard() {
        return this.board;
    }
    
    public void setMove(String move) {
        this.move = move;
    }
    
    // 返り値はtrueならば相手のターンに移る
    public boolean applyAction(String action) {
        if(action.equals(Const.PASS_STR)) {
            switchTurn();
            checkPutable(this.getIntMove());
            //System.out.println(this.getMove()+" "+Const.PASS_STR);
            return true;
        }
        
        int iact = Integer.parseInt(action);
        boolean p;
        if(iact > 63) {
            p = true;
            iact -= 64;
        } else {
            p = false;
        }
        
        int x,y;
        x = iact / Const.BSIZE;
        y = iact % Const.BSIZE;
        int move = this.getIntMove();
        
        if(board[x][y] != Const.PUTABLE) {System.err.println("action: " + action + " error"); return false;}
        if(p) {
            board[x][y] = (move == Const.BLACK) ? Const.PBLACK: Const.PWHITE;
        } else {
            board[x][y] = move;
        }

        flip(move, x, y, true);
        switchTurn();
        checkPutable(this.getIntMove());
        return true;
    }
    
    public int getIntMove() {
        return (this.move.equals(Const.BLACK_STR)) ? Const.BLACK : Const.WHITE;
    }
    
    public void switchTurn() {
        this.move = (this.move.equals(Const.BLACK_STR)) ? Const.WHITE_STR : Const.BLACK_STR;
    }
    
    public boolean flip(int move, int nx, int ny, boolean b) {
        boolean flag = false;
        for(int i=-1; i<2; i++) {
            for(int j=-1; j<2; j++) {
                if(i==0 && j==0) continue;

                int dx = i;
                int dy = j;
                int nmove = (move == Const.BLACK) ? Const.WHITE : Const.BLACK;
                int npmove = (move == Const.BLACK) ? Const.PWHITE : Const.PBLACK;
                int x,y;
                
                x = nx + dx;
                y = ny + dy;
                if(x<0 || x>7 || y<0 || y>7) continue;
                while(board[x][y] == nmove || board[x][y] == npmove) {
                    x += dx;
                    y += dy;
                    if(x<0 || x>7 || y<0 || y>7) break;
                }
                if(x<0 || x>7 || y<0 || y>7) continue;
                
                if(board[x][y] == Const.SPACE || board[x][y] == Const.PUTABLE) {
                    continue;
                }
                
                x -= dx;
                y -= dy;
                while(x != nx || y != ny) {
                    if(b) {
                        if(!(board[x][y] == Const.PBLACK || board[x][y] == Const.PWHITE))
                            board[x][y] = move;
                        x -= dx;
                        y -= dy;
                        flag = true;
                    } else {
                        board[nx][ny] = Const.PUTABLE;
                        return true;
                    }
                }
            }
        }
        return flag;
    }
    
    public int checkPutable(int move) {
        int p = 0;
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                if(board[i][j] == Const.PUTABLE || board[i][j] == Const.SPACE) {
                    board[i][j] = Const.SPACE;
                    if(flip(move, i, j, false)) {
                        px[p] = i;
                        py[p] = j;
                        p++;
                    }
                }
            }
        }
        pnum = p;
        return p;
    }
    
    public Othello clone() {
        Othello o = new Othello();
        int[][] b = o.getBoard();
        int[] px = o.getPx();
        int[] py = o.getPy();
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                b[i][j] = this.board[i][j];
                px[i*Const.BSIZE + j] = this.px[i*Const.BSIZE + j];
                py[i*Const.BSIZE + j] = this.py[i*Const.BSIZE + j];
            }
        }
        o.move = this.move;
        o.pnum = this.pnum;
        return o;
    }
    
    public void print() {
        int[][] board = this.getBoard();
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                System.out.print(Const.PRINT_BOARD[board[i][j]]);
            }
            System.out.println();
        }
    }

    public int getScore(int c) {
        int n=0;
        if(c == Const.BLACK) {
            for(int i=0; i<Const.BSIZE; i++) {
                for(int j=0; j<Const.BSIZE; j++) {
                    if(this.board[i][j] == Const.BLACK || this.board[i][j] == Const.PBLACK) {
                        n++;
                    }
                }
            }
        } else {
            for(int i=0; i<Const.BSIZE; i++) {
                for(int j=0; j<Const.BSIZE; j++) {
                    if(this.board[i][j] == Const.WHITE || this.board[i][j] == Const.PWHITE) {
                        n++;
                    }
                }
            }
        }
        return n;
    }
    
    public int getTurn() {
        int n = 0;
        for(int i=0; i<Const.BSIZE; i++) {
            for(int j=0; j<Const.BSIZE; j++) {
                if(board[i][j] == Const.SPACE || board[i][j] == Const.PUTABLE)
                    continue;
                n++;
            }
        }
        return n - 4;
    }
}