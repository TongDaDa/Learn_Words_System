import java.lang.*;

final class Test {
    public int y = 12;
}

public class Qwe {
    public static void main(String[] args) {
        Test test = new Test();

        System.out.println(test.y);
        fun(test);
        System.out.print(test.y);
    }

    public static void fun(Test test){
        test.y = 50;
        System.out.print(test.y);
    }
}
