 class DifferenceWithoutMinus {
    public static void main(String[] args) {
        int num1 = -10;
        int num2 = 5;

        // Calculate the difference without using subtraction
        int difference;

        if (num2 < 0) {
            difference = num1 + Math.abs(num2);
        } else {
            difference = num1 + (-num2);
        }

        System.out.println("The difference is: " + difference);
    }
}
