public class Demo {
    public static void main(String[] args) {
        int a = 18;
        int b = 42;

        int max = ((a + b) + (a - b) * (((a - b) * (a - b)) / ((a - b) * (a - b)))) / 2;

        System.out.print(max);
    }
}
