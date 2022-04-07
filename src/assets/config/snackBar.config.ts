import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

class SnackBar{
  static horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  static verticalPosition: MatSnackBarVerticalPosition = 'top';



}


export const snackBarConfig = {
  duration: 5 * 1000,
  horizontalPosition: SnackBar.horizontalPosition,
  verticalPosition: SnackBar.verticalPosition

}
